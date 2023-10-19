# Use an official Python runtime as a parent image
FROM python:3.10.13-slim


WORKDIR /app

# Install system dependencies and tools
# Install system packages
RUN apt-get update && apt-get install -y --no-install-recommends \
      bzip2 \
      g++ \
      git \
      graphviz \
      libgl1-mesa-glx \
      libhdf5-dev \
      openmpi-bin \
      wget \
      python3-tk && \
    rm -rf /var/lib/apt/lists/*


COPY requeriments.txt /app

RUN pip install -r requeriments.txt

COPY . .

EXPOSE 8000

CMD [ "python", "index.py" ]