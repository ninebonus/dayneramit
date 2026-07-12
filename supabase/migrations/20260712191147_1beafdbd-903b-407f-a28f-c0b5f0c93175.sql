
REVOKE ALL ON FUNCTION public.next_document_number(public.doc_type) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.next_document_number(public.doc_type) TO authenticated;
