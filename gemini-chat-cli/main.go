package main

import (
	"bufio"
	"context"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

func main() {
	apiKey := os.Getenv("GEMINI_API_KEY")
	if apiKey == "" {
		log.Fatal("GEMINI_API_KEY environment variable not set.")
	}

	historyFile, err := os.OpenFile("chat_history.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Fatalf("Failed to open chat history file: %v", err)
	}
	defer historyFile.Close()

	ctx := context.Background()
	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		log.Fatalf("Failed to create Generative AI client: %v. Check your API key and network connection.", err)
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-pro")
	chat := model.StartChat()

	scanner := bufio.NewScanner(os.Stdin)
	fmt.Println("Chat with Gemini Pro. Type 'exit' to quit.")
	fmt.Println("-------------------------------------------")

	for {
		fmt.Print("You: ")
		if !scanner.Scan() {
			if err := scanner.Err(); err != nil {
				log.Printf("Error reading input: %v", err)
			}
			break
		}
		userInput := scanner.Text()

		if userInput == "exit" {
			break
		}

		if userInput == "" {
			continue
		}

		if _, err := historyFile.WriteString(fmt.Sprintf("You: %s\n", userInput)); err != nil {
			log.Printf("Failed to write user input to history: %v", err)
		}

		resp, err := chat.SendMessage(ctx, genai.Text(userInput))
		if err != nil {
			log.Printf("Error sending message to Gemini: %v. Please try again.", err)
			continue
		}

		if resp == nil || resp.Candidates == nil || len(resp.Candidates) == 0 {
			fmt.Println("Gemini: No response received.")
			if _, err := historyFile.WriteString("Gemini: No response received.\n"); err != nil {
				log.Printf("Failed to write 'no response' to history: %v", err)
			}
			continue
		}

		var geminiResponseParts []string
		fmt.Print("Gemini: ")
		for _, cand := range resp.Candidates {
			if cand.Content != nil {
				for _, part := range cand.Content.Parts {
					if text, ok := part.(genai.Text); ok {
						fmt.Print(text)
						geminiResponseParts = append(geminiResponseParts, string(text))
					}
				}
			}
		}
		fmt.Println()
		
		fullGeminiResponse := strings.Join(geminiResponseParts, "")
		if _, err := historyFile.WriteString(fmt.Sprintf("Gemini: %s\n", fullGeminiResponse)); err != nil {
			log.Printf("Failed to write Gemini response to history: %v", err)
		}
	}
	fmt.Println("-------------------------------------------")
	fmt.Println("Chat ended.")
}
