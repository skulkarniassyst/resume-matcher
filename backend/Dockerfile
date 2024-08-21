# Use the official Python image from the Docker Hub
FROM python:3.12-slim

# Set environment variables to prevent Python from buffering stdout/stderr
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory inside the container
WORKDIR /backend

# Copy the requirements.txt file into the container
COPY requirements.txt /backend/

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . /backend/

# Expose the port that the application runs on
EXPOSE 5000

# Set the environment variables for Flask
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=5000

# Specify the command to run the application using python -m
CMD ["python", "-m", "app"]
