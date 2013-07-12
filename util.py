import string
import random

ALPHABET = string.letters + string.digits

def generate_url(length=10):
    return ''.join(random.sample(ALPHABET, length))

def main():
    print(generate_url())

if __name__ == '__main__':
    main()