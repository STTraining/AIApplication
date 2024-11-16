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
    settings = data.get('settings', {})
    dialogues = data.get('dialogues', [])

    speaker1 = settings.get('speaker1', {})
    speaker2 = settings.get('speaker2', {})
    topic = settings.get('topic', 'AI同士の会話')

    # 過去の会話を文字列として結合
    conversation_history = "\n".join(
        f"{d['speaker']}: {d['message']}" for d in dialogues
    )

    # プロンプトの作成
    prompt = f"""
以下は{speaker1.get('name', 'スピーカー1')}と{speaker2.get('name', 'スピーカー2')}の会話です。
トピックは「{topic}」です。

{speaker1.get('name', 'スピーカー1')}は「{speaker1.get('personality', '親しみやすい')}」性格を持っています。
{speaker2.get('name', 'スピーカー2')}は「{speaker2.get('personality', '親しみやすい')}」性格を持っています。

会話履歴:
{conversation_history}

次に話すべき内容を生成してください。
返答する人物を指定し、短く簡潔に答えてください。
"""

    # OpenAI APIを使用して次の会話を生成
    response = openai.chat.completions.create(
        model="gpt-4o",  # gpt-4モデルに変更
        messages=[
            {"role": "system", "content": "話題と会話履歴を元に次の会話を生成します。"},
            {"role": "user", "content": prompt}
        ],
        response_format= {
            "type": "json_schema",
            "json_schema": {
                "name": "chat_response",
                "strict": True,
                "schema": {
                    "type": "object",
                    "properties": {
                        "speaker": {
                            "type": "string"
                        },
                        "message": {
                            "type": "string"
                        }
                    },
                    "required": ["speaker", "message"],
                    "additionalProperties": False
                }
            }
        },
        max_tokens=150,
        temperature=0.7  # 必要に応じて調整
    )

    # 生成されたテキストを解析
    generated_text = response.choices[0].message.content.strip()
    print('********************',generated_text)
    # dialogues = generated_text.split('\n')
    # print(dialogues)

    # # 会話データを整形して返却
    # dialogue_data = []
    # for line in dialogues:
    #     if ':' in line:
    #         speaker, message = line.split(':', 1)
    #         dialogue_data.append({"speaker": speaker.strip(), "message": message.strip()})

    # print(dialogue_data)
    return jsonify(generated_text)
    # return jsonify(dialogue_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
