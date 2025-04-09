/*
  # Add sample hotels data

  1. Insert sample hotels for Kathmandu and Pokhara
*/

INSERT INTO hotels (id, name, location, price_per_night, description, image_url, rating)
VALUES 
  -- Kathmandu Hotels
  (
    gen_random_uuid(),
    'Yak & Yeti Hotel',
    'Kathmandu',
    15000,
    'Luxury hotel in the heart of Kathmandu with traditional architecture and modern amenities',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    4.8
  ),
  (
    gen_random_uuid(),
    'Hotel Himalaya',
    'Kathmandu',
    12000,
    'Elegant hotel offering stunning mountain views and exceptional service',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    4.5
  ),
  (
    gen_random_uuid(),
    'Kathmandu Guest House',
    'Kathmandu',
    8000,
    'Historic boutique hotel in Thamel with beautiful gardens',
    'https://images.unsplash.com/photo-1561501900-3701fa6a0864?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    4.3
  ),
  -- Pokhara Hotels
  (
    gen_random_uuid(),
    'Temple Tree Resort',
    'Pokhara',
    14000,
    'Peaceful resort with lake views and spa facilities',
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    4.7
  ),
  (
    gen_random_uuid(),
    'Waterfront Resort',
    'Pokhara',
    16000,
    'Luxury lakeside resort with infinity pool and mountain views',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    4.9
  ),
  (
    gen_random_uuid(),
    'Hotel Barahi',
    'Pokhara',
    11000,
    'Centrally located hotel with rooftop restaurant',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    4.4
  );