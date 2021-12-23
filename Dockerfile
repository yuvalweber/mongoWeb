FROM python:3.7-alpine
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
USER 1001
CMD ["python3","app.py"]
