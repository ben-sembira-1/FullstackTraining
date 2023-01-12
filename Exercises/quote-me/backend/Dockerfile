FROM ubuntu:jammy

RUN apt-get update && apt-get install -y python3 python3-pip
RUN pip install \
  fastapi \
  "uvicorn[standard]"

COPY . /app

WORKDIR /app/src
CMD [ "uvicorn", "main:app" ]
