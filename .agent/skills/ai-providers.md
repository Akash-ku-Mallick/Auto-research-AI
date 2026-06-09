# AI Provider Standards

All AI providers must implement the same interface.

```ts
export interface AIProvider {
  generate(
    prompt: string,
    options?: GenerateOptions
  ): Promise<string>;
}
```

## Supported Providers

### Gemini

Use for:

* High quality analysis
* Final summaries
* Trend clustering

### Ollama

Use for:

* Initial filtering
* Cost optimization
* Local execution

Preferred Models:

* llama3.3
* qwen3
* mistral

## Selection Logic

Priority:

1. User configured provider
2. Active provider
3. Fallback provider

AI modules must never directly call provider SDKs.

Always use ProviderFactory.

```
```
