export const AI_CONFIG = {
  defaultModel: "xai/grok-2-1212",
  fallbackModel: "xai/grok-2-1212",
  maxTokens: {
    generate: 1000,
    reply: 800,
    thread: 2000,
  },
  defaultTemperature: 0.8,
  supportedPlatforms: ["twitter", "linkedin", "instagram", "facebook", "threads"],
  supportedTones: ["professional", "casual", "humorous", "inspirational", "educational"],
}

export function getAIModel(userApiKey?: string) {
  // If user provides their own API key, use their model
  // Otherwise use default configured model
  return AI_CONFIG.defaultModel
}

export function getTemperature(userPreference?: number) {
  return userPreference || AI_CONFIG.defaultTemperature
}
