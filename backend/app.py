from flask import Flask, request, jsonify
import openai
import os
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# OpenAIのAPIキーを設定
openai.api_key = os.environ.get('OPENAI_API_KEY')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    speaker1 = data.get('speaker1', {})
    speaker2 = data.get('speaker2', {})
    topic = data.get('topic', '')

    # AI同士の会話生成のためのプロンプトを作成
    prompt = f"話題: {topic}\n\n"
    prompt += f"{speaker1['name']}({speaker1['personality']}):\n"
    prompt += f"{speaker2['name']}({speaker2['personality']}):"

    # OpenAI APIを使用して次の会話を生成
    response = openai.chat.completions.create(
        model="gpt-4o",  # gpt-4モデルに変更
        messages=[
            {"role": "system", "content": "あなたは親しみやすく知的な会話のガイドです。"},
            {"role": "user", "content": prompt}
        ],
        max_tokens=150,
        temperature=0.7  # 必要に応じて調整
    )

    # 生成されたテキストを解析
    generated_text = response.choices[0].message.content.strip()
    print(generated_text)
    dialogues = generated_text.split('\n')
    print(dialogues)

    # 会話データを整形して返却
    dialogue_data = []
    for line in dialogues:
        if ':' in line:
            speaker, message = line.split(':', 1)
            dialogue_data.append({"speaker": speaker.strip(), "message": message.strip()})

    print(dialogue_data)
    return jsonify(dialogues)
    # return jsonify(dialogue_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
