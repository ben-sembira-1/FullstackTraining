FROM ubuntu:jammy

RUN apt-get update && apt-get install -y python3 python3-pip
RUN pip install fastapi

COPY . /app

CMD [ "python3", "/app/src/main.py" ]
