FROM mcr.microsoft.com/devcontainers/base:ubuntu-22.04
RUN apt-get update && apt-get autoclean && apt-get autoremove && apt-get install -y \
  procps curl file git golang-go\
  && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
  && apt-get install -y nodejs \
  && npm install -g yarn \
  && yarn global add npm-check-updates \
  && rm -rf /var/lib/apt/lists/*

# install homwbrew
RUN /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" \
  && echo >> /root/.bashrc \
  && echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /root/.bashrc \
  && eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)" \
  && apt-get install build-essential \
  && brew install gcc hugo sass/sass/sass

# set environmental variables
ENV PATH="/home/linuxbrew/.linuxbrew/bin:/home/linuxbrew/.linuxbrew/sbin:${PATH}"
