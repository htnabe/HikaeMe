FROM mcr.microsoft.com/devcontainers/base:ubuntu-22.04

LABEL maintainer="htnabe"

ARG username=not-root
ARG useruid=1234
ARG usergid=${useruid}

RUN apt-get update && apt-get autoclean && apt-get autoremove && apt-get install -y \
  procps curl file git golang-go\
  && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
  && apt-get install -y nodejs \
  && rm -rf /var/lib/apt/lists/*

# create user
RUN groupadd --gid $usergid $username \
  && useradd --uid $useruid --gid $usergid -m $username \
  # [Optional] Add sudo support. Omit if you don't need to install software after connecting.
  && apt-get update \
  && apt-get install -y sudo \
  && echo $username ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$username \
  && chmod 0440 /etc/sudoers.d/$username

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
