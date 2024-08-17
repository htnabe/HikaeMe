+++
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
date = {{ .Date }}
draft = true
toc = true
tags = []
categories = []
thumbnail = "{{ "" | default .Site.Params.defaultThumbnailUrl }}"
+++
