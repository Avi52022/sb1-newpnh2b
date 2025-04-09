/*
  # Create tickets table

  1. New Tables
    - `tickets`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `booking_type` (text) - 'flight' or 'bus'
      - `booking_id` (uuid)
      - `booking_number` (text)
      - `qr_code` (text)
      - `status` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on tickets table
    - Add policies for users to manage their tickets
*/

CREATE TABLE IF NOT EXISTS tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  booking_type text NOT NULL CHECK (booking_type IN ('flight', 'bus')),
  booking_id uuid NOT NULL,
  booking_number text NOT NULL,
  qr_code text NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'used', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own tickets"
  ON tickets
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own tickets"
  ON tickets
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);