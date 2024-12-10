FROM mcr.microsoft.com/devcontainers/base:ubuntu-22.04

LABEL maintainer="htnabe"

ARG username=vscode
ARG useruid=1000
ARG usergid=${useruid}

RUN apt-get update && apt-get autoclean && apt-get autoremove && apt-get install -y \
  procps curl file git golang-go\
  && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
  && apt-get install -y nodejs \
  && rm -rf /var/lib/apt/lists/*

# create user
RUN set -eux \
  && echo "Creating user with username=${username}, uid=${useruid}, gid=${usergid}" \
  && (getent group ${usergid} || groupadd --gid ${usergid} ${username}) \
  && (id -u ${useruid} >/dev/null 2>&1 || useradd -s /bin/bash --uid ${useruid} --gid ${usergid} -m ${username}) \
  && echo "${username} ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/${username} \
  && chmod 0440 /etc/sudoers.d/${username}

# install homwbrew
RUN /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" \
  && echo >> /root/.bashrc \
  && echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /root/.bashrc \
  && eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)" \
  && apt-get install build-essential \
  && brew install gcc hugo sass/sass/sass

# set environmental variables
ENV PATH="/home/linuxbrew/.linuxbrew/bin:/home/linuxbrew/.linuxbrew/sbin:${PATH}"
USER ${username}
