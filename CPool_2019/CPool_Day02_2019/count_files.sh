#!/bin/sh
find . \( ! -regex '.*/\..*' \) -type f | wc -l
