-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  creator_verified BOOLEAN DEFAULT false,
  phone_number TEXT,
  preferred_payment_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Update Event table structure
ALTER TABLE public.Event 
  DROP COLUMN IF EXISTS name,
  DROP COLUMN IF EXISTS description,
  DROP COLUMN IF EXISTS location,
  DROP COLUMN IF EXISTS "time",
  DROP COLUMN IF EXISTS ticket_type;

ALTER TABLE public.Event ADD COLUMN title TEXT NOT NULL DEFAULT '';
ALTER TABLE public.Event ADD COLUMN description TEXT;
ALTER TABLE public.Event ADD COLUMN location TEXT;
ALTER TABLE public.Event ADD COLUMN start_date TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.Event ADD COLUMN end_date TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.Event ADD COLUMN creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE;
ALTER TABLE public.Event ADD COLUMN cover_image_url TEXT;
ALTER TABLE public.Event ADD COLUMN video_url TEXT;
ALTER TABLE public.Event ADD COLUMN status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'cancelled'));
ALTER TABLE public.Event ADD COLUMN category TEXT;
ALTER TABLE public.Event ADD COLUMN max_attendees INTEGER;
ALTER TABLE public.Event ADD COLUMN is_free BOOLEAN DEFAULT false;
ALTER TABLE public.Event ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create ticket types table
CREATE TABLE public.ticket_types (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id BIGINT REFERENCES public.Event(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) DEFAULT 0,
  quantity_available INTEGER,
  quantity_sold INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create tickets table
CREATE TABLE public.tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id BIGINT REFERENCES public.Event(id) ON DELETE CASCADE,
  ticket_type_id UUID REFERENCES public.ticket_types(id) ON DELETE CASCADE,
  buyer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  qr_code TEXT UNIQUE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'used', 'cancelled', 'refunded')),
  purchase_amount DECIMAL(10,2),
  payment_id TEXT,
  checked_in_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID REFERENCES public.tickets(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'NGN',
  payment_method TEXT NOT NULL,
  payment_provider TEXT NOT NULL,
  provider_payment_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create tips table
CREATE TABLE public.tips (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id BIGINT REFERENCES public.Event(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  tipper_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'NGN',
  message TEXT,
  payment_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create payouts table
CREATE TABLE public.payouts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'NGN',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  payout_method TEXT,
  account_details JSONB,
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.Event ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;