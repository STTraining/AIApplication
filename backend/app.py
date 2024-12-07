# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os

# envから環境変数を読み込む
load_dotenv()
client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # CORS設定

@app.route('/api/topic', methods=['POST'])
def chatgpt_message():
    message = request.json.get("message", "")
    currentSpeaker = request.json.get("currentSpeaker", "")
    previousMessage = request.json.get("previousMessage", "")
    print(message)
    print(currentSpeaker)
    print(previousMessage)
    if not message:
        return jsonify({"error": "Message content is empty"}), 400
    try:
        # GPTへのリクエスト
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": [
                        {
                            "type": "text",
                            "text": message
                        }
                    ]
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": f"{previousMessage}{currentSpeaker}の番です。"
                        }
                    ]
                }
            ]
        )

        # GPTの応答を取得
        chatgpt_reply = response.choices[0].message.content
        return jsonify({'reply': chatgpt_reply}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
