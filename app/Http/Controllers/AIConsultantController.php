<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AIConsultantController extends Controller
{
    public function consult(Request $request)
    {
        $userMessage = $request->input('message');

        $systemPrompt = "You are Legal-Buddy — a friendly, approachable, and helpful legal consultant specializing in Indian law.  
        Please respond in simple, friendly Hinglish (mix of Hindi and English) so that even non-lawyers can easily understand.  
        Be warm, supportive, and guide the user step-by-step, giving practical suggestions.  
        If appropriate, end your responses with motivating or reassuring words like: 'Don't worry, I got you!' or 'Bas chill karo, yeh simple hai!'.  
        Always talk like a supportive buddy.";

        try {
            $response = Http::withToken(env('OPENAI_API_KEY'))
                ->post('https://openrouter.ai/api/v1/chat/completions', [  
                    'model' => 'meta-llama/llama-3.3-70b-instruct:free',
                    'messages' => [
                        ['role' => 'system', 'content' => $systemPrompt],
                        ['role' => 'user', 'content' => $userMessage],
                    ],
                ]);

            if (!$response->successful()) {
                Log::error('Legal-Buddy API request failed', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                return response()->json([
                    'reply' => '⚠️ Legal-Buddy ko server se reply nahi mila. Thodi der baad try karo, main hoon yahan! 🤗'
                ]);
            }

            $responseData = $response->json();
            Log::info('Legal-Buddy API response:', $responseData);

            $aiReply = $responseData['choices'][0]['message']['content'] ?? '⚠️ Legal-Buddy ko thoda confusion hua. Thodi der baad try kar lena!';

            return response()->json([
                'reply' => $aiReply
            ]);

        } catch (\Exception $e) {
            Log::error('Legal-Buddy Exception:', ['error' => $e->getMessage()]);

            return response()->json([
                'reply' => '⚠️ Legal-Buddy ko kuch error aa gaya. Chill karo, aur thodi der baad try kar lena! 😊'
            ]);
        }
    }
}
