
CREATE TYPE public.doc_type AS ENUM ('quotation','invoice','receipt','tax_invoice','billing_note');
CREATE TYPE public.doc_status AS ENUM ('draft','sent','approved','paid','cancelled');

CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  doc_number TEXT NOT NULL,
  type public.doc_type NOT NULL,
  status public.doc_status NOT NULL DEFAULT 'draft',
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE,
  customer JSONB NOT NULL DEFAULT '{}'::jsonb,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  subtotal NUMERIC(14,2) NOT NULL DEFAULT 0,
  discount NUMERIC(14,2) NOT NULL DEFAULT 0,
  vat_enabled BOOLEAN NOT NULL DEFAULT true,
  vat_rate NUMERIC(5,4) NOT NULL DEFAULT 0.07,
  vat_amount NUMERIC(14,2) NOT NULL DEFAULT 0,
  wht_enabled BOOLEAN NOT NULL DEFAULT false,
  wht_rate NUMERIC(5,4) NOT NULL DEFAULT 0.03,
  wht_amount NUMERIC(14,2) NOT NULL DEFAULT 0,
  total NUMERIC(14,2) NOT NULL DEFAULT 0,
  note TEXT,
  payment_terms TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_documents_created_by ON public.documents(created_by);
CREATE INDEX idx_documents_type ON public.documents(type);
CREATE INDEX idx_documents_created_at ON public.documents(created_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.documents TO authenticated;
GRANT ALL ON public.documents TO service_role;

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own_select" ON public.documents FOR SELECT TO authenticated USING (auth.uid() = created_by);
CREATE POLICY "own_insert" ON public.documents FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "own_update" ON public.documents FOR UPDATE TO authenticated USING (auth.uid() = created_by) WITH CHECK (auth.uid() = created_by);
CREATE POLICY "own_delete" ON public.documents FOR DELETE TO authenticated USING (auth.uid() = created_by);

CREATE TABLE public.document_counters (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type public.doc_type NOT NULL,
  year INT NOT NULL,
  seq INT NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, type, year)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.document_counters TO authenticated;
GRANT ALL ON public.document_counters TO service_role;
ALTER TABLE public.document_counters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own_counter" ON public.document_counters FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.next_document_number(_type public.doc_type)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid UUID := auth.uid();
  _year INT := EXTRACT(YEAR FROM CURRENT_DATE)::INT;
  _seq INT;
  _prefix TEXT;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;

  INSERT INTO public.document_counters (user_id, type, year, seq)
  VALUES (_uid, _type, _year, 1)
  ON CONFLICT (user_id, type, year) DO UPDATE SET seq = document_counters.seq + 1
  RETURNING seq INTO _seq;

  _prefix := CASE _type
    WHEN 'quotation' THEN 'QT'
    WHEN 'invoice' THEN 'IV'
    WHEN 'receipt' THEN 'RC'
    WHEN 'tax_invoice' THEN 'TX'
    WHEN 'billing_note' THEN 'BN'
  END;
  RETURN _prefix || '-' || _year || '-' || LPAD(_seq::TEXT, 4, '0');
END;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public
AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER documents_updated_at BEFORE UPDATE ON public.documents
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
