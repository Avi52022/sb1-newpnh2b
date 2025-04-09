/*
  # Add hotel bookings table

  1. New Tables
    - `hotel_bookings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `hotel_id` (uuid, references hotels)
      - `room_type` (text)
      - `check_in_date` (date)
      - `check_out_date` (date)
      - `total_price` (numeric)
      - `payment_method` (text)
      - `status` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on hotel_bookings table
    - Add policies for users to manage their bookings
*/

CREATE TABLE IF NOT EXISTS hotel_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  hotel_id uuid REFERENCES hotels(id) ON DELETE CASCADE,
  room_type text NOT NULL,
  check_in_date date NOT NULL,
  check_out_date date NOT NULL,
  total_price numeric NOT NULL,
  payment_method text NOT NULL CHECK (payment_method IN ('card', 'cash')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE hotel_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bookings"
  ON hotel_bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings"
  ON hotel_bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
  ON hotel_bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);