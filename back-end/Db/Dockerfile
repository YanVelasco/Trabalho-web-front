# We choose exact tag (not 'latest'), to be sure that new version won't break creating image
FROM mcr.microsoft.com/mssql/server:2022-latest

# Create app directory
WORKDIR /usr/src/app

# Copy initialization scripts
COPY . /usr/src/app

# Grant permissions for the run-initialization script to be executable
COPY --chmod=755 run-initialization.sh /usr/src/app/run-initialization.sh
COPY --chmod=755 create-database.sql /usr/src/app/create-database.sql
COPY --chmod=755 entrypoint.sh /usr/src/app/entrypoint.sh

# Set environment variables, not to have to write them with docker run command
# Note: make sure that your password matches what is in the run-initialization script 
ENV SA_PASSWORD validpassword123!@#
ENV ACCEPT_EULA Y
ENV MSSQL_PID Express

# Expose port 1433 in case accesing from other container
EXPOSE 1433

# Run Microsoft SQl Server and initialization script (at the same time)
# Note: If you want to start MsSQL only (without initialization script) you can comment bellow line out, CMD entry from base image will be taken
CMD /bin/bash ./entrypoint.sh