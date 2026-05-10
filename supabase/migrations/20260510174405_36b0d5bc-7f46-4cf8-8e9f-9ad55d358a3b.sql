
REVOKE ALL ON public.donations FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_donation_stats() FROM anon, authenticated, public;
