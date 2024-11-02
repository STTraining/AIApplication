# ベースイメージ
FROM python:3.9

# Node.jsのインストール（React用）
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs

# 必要なPythonパッケージをインストール
COPY requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt

# 作業ディレクトリを設定
WORKDIR /workspace
