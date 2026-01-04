-- Create voice_profiles table
CREATE TABLE IF NOT EXISTS voice_profiles (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  sarcasm_level INTEGER NOT NULL,
  tired_level INTEGER NOT NULL,
  favorite_words TEXT[] NOT NULL,
  avg_length INTEGER NOT NULL,
  tone TEXT NOT NULL,
  sample_posts TEXT[] NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create generated_posts table
CREATE TABLE IF NOT EXISTS generated_posts (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  input_text TEXT NOT NULL,
  tone TEXT NOT NULL,
  generated_posts TEXT[] NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_voice_profiles_user_id ON voice_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_generated_posts_user_id ON generated_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_generated_posts_created_at ON generated_posts(created_at DESC);

-- Add updated_at trigger for voice_profiles
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_voice_profiles_updated_at BEFORE UPDATE ON voice_profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
