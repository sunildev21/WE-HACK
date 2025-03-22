<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AIConsultantController extends Controller
{
    public function consult(Request $request)
    {
        $userMessage = $request->input('message');

        $response = Http::withToken(env('OPENAI_API_KEY'))
            ->post('https://openrouter.ai/api/v1/chat/completions', [ // Make sure this endpoint is correct based on OpenRouter docs
                'model' => 'google/gemma-3-27b-it:free',
                'messages' => [
                    ['role' => 'system', 'content' => 'You are a helpful legal consultant.'],
                    ['role' => 'user', 'content' => $userMessage],
                ],
            ]);

        $responseData = $response->json();
        $aiReply = $responseData['choices'][0]['message']['content'] ?? '⚠️ AI did not respond.';

        return response()->json([
            'reply' => $aiReply
        ]);
    }
}
