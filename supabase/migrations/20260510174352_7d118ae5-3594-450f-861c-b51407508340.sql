
CREATE TABLE public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT,
  stripe_subscription_id TEXT,
  donor_email TEXT,
  donor_name TEXT,
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  is_recurring BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending',
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- No public read of individual donations (privacy). Aggregate via secure RPC below.
CREATE POLICY "Donations are not publicly readable"
ON public.donations FOR SELECT
USING (false);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER update_donations_updated_at
BEFORE UPDATE ON public.donations
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Public aggregate stats (count + total) for completed donations
CREATE OR REPLACE FUNCTION public.get_donation_stats()
RETURNS TABLE(total_donors BIGINT, total_amount_cents BIGINT)
LANGUAGE sql SECURITY DEFINER SET search_path = public STABLE AS $$
  SELECT COUNT(*)::BIGINT, COALESCE(SUM(amount_cents), 0)::BIGINT
  FROM public.donations
  WHERE status = 'completed';
$$;

GRANT EXECUTE ON FUNCTION public.get_donation_stats() TO anon, authenticated;
