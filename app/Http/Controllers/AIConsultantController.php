<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AIConsultantController extends Controller
{
    public function consult(Request $request)
    {
        $userMessage = $request->input('message');

        $systemPrompt = "You are Legal-Buddy — a friendly, approachable, and helpful legal consultant specializing in Indian law.  
        Please respond in simple, friendly Hinglish (a mix of Hindi and English) so that even non-lawyers can easily understand.  
        Be warm, supportive, and guide the user step-by-step, giving practical suggestions.  
        If appropriate, end your responses with motivating or reassuring words, like a real buddy saying: 'Don't worry, I got you!' or 'Bas chill karo, yeh simple hai!'.";

        $response = Http::withToken(env('OPENAI_API_KEY'))
            ->post('https://openrouter.ai/api/v1/chat/completions', [
                'model' => 'google/gemma-3-27b-it:free',
                'messages' => [
                    ['role' => 'system', 'content' => $systemPrompt],
                    ['role' => 'user', 'content' => $userMessage],
                ],
            ]);

        $responseData = $response->json();
        $aiReply = $responseData['choices'][0]['message']['content'] ?? '⚠️ Legal-Buddy ko thoda issue aa gaya. Thodi der baad try karo!';

        return response()->json([
            'reply' => $aiReply
        ]);
    }


}
