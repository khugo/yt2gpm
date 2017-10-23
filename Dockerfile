FROM python:3
ENV PYTHONBUFFERED 1
RUN echo "deb http://ftp.uk.debian.org/debian jessie-backports main" >> /etc/apt/sources.list && \
  apt-get update && \
  apt-get install ffmpeg -y
RUN mkdir /app
WORKDIR /app
RUN pip install pipenv
ADD Pipfile Pipfile.lock /app/
RUN pipenv install --system
ADD . /app/
CMD gunicorn --bind 0.0.0.0:$PORT --workers=1 wsgi
