FROM ubuntu:latest

# Install cron daemon and curl
RUN apt update && apt install -y cron curl

# Copy script and cron file to the container
COPY script.sh /script.sh
COPY cron /etc/cron.d/cron

# Give the permissions
RUN chmod 0755 /script.sh
RUN chmod 0644 /etc/cron.d/cron

# Add the cron job
RUN crontab /etc/cron.d/cron

# Link cron log file to stdout
RUN ln -s /dev/stdout /var/log/cron

# Run the cron service in the foreground
CMD ["cron", "-f"]
