# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory
WORKDIR /app

# Copy requirements.txt
COPY requirements.txt ./

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["python", "app.py"]
