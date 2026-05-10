ALTER TABLE public.donations
  ADD COLUMN IF NOT EXISTS donor_first_name text,
  ADD COLUMN IF NOT EXISTS donor_last_name text,
  ADD COLUMN IF NOT EXISTS donor_phone text;