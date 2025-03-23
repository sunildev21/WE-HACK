<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\ChatConversation;
use Illuminate\Support\Facades\Auth;

class AIConsultantController extends Controller
{
    public function consult(Request $request)
    {
        if (!Auth::check()) {
            return response()->json([
                'reply' => '⚠️ Aap login nahi ho. Please login karke dobara try karo! 😊'
            ], 401);
        }

        $userMessage = $request->input('message');

        $systemPrompt = "You are Legal-Buddy — a friendly, approachable, and helpful legal consultant specializing in Indian law.  
        Please respond in simple, friendly Hinglish (mix of Hindi and English) so that even non-lawyers can easily understand.  
        Be warm, supportive, and guide the user step-by-step, giving practical suggestions.  
        If appropriate, end your responses with motivating or reassuring words like: 'Don't worry, I got you!' or 'Bas chill karo, yeh simple hai!'.  
        Always talk like a supportive buddy and try to remember previous conversations to help better.";

        // Fetch last 6 chat messages for context
        $previousMessages = ChatConversation::where('user_id', Auth::id())
            ->orderBy('created_at', 'asc')
            ->take(6)
            ->get()
            ->flatMap(function ($chat) {
                return [
                    ['role' => 'user', 'content' => $chat->user_message],
                    ['role' => 'assistant', 'content' => $chat->bot_reply],
                ];
            })
            ->toArray();

        try {
            $response = Http::withToken(env('OPENAI_API_KEY'))
                ->post('https://openrouter.ai/api/v1/chat/completions', [
                    'model' => 'google/gemma-3-12b-it:free',
                    'messages' => array_merge(
                        [['role' => 'system', 'content' => $systemPrompt]],
                        $previousMessages,
                        [['role' => 'user', 'content' => $userMessage]]
                    ),
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

            // Save conversation
            ChatConversation::create([
                'user_id' => Auth::id(),
                'user_message' => $userMessage,
                'bot_reply' => $aiReply,
            ]);

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

    public function history()
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Not authenticated'], 401);
        }

        Log::info('Fetching chat history for user:', ['user_id' => Auth::id()]);

        $chats = ChatConversation::where('user_id', Auth::id())
            ->orderBy('created_at')
            ->get()
            ->flatMap(function ($chat) {
                return [
                    ['role' => 'user', 'content' => $chat->user_message],
                    ['role' => 'assistant', 'content' => $chat->bot_reply]
                ];
            })
            ->toArray();

        return response()->json($chats);
    }
}
