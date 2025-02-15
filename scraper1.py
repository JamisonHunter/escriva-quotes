import time
from selenium import webdriver
from bs4 import BeautifulSoup 

def check_page():
    page_number = 809

    folder = "Furrow"

    while True:
        browser = webdriver.Chrome()
        browser.get(f"https://escriva.org/en/surco/{page_number}/") 

        file_path = f"{folder}/furrow-{page_number}.txt"

        content = browser.page_source
        browser.close()

        soup = BeautifulSoup(content, "html.parser")
        p_elements = soup.find_all('p')
        print()
        substring = "Document printed from"
        break_string = "Sorry, but we can't seem to find the page you are looking for."
        if any(break_string in i.text for i in p_elements):
            break

        p_elements = [item for item in p_elements if substring not in item.text]

        if len(p_elements) == 1:
            print(page_number)
            print(p_elements[0].text.strip())
            with open(file_path, "w") as file:
                file.write(f"{str(page_number)}\n")
                file.write(f"{p_elements[0].text.strip()}\n")
        elif len(p_elements) > 1:
            print(page_number)
            print(p_elements[0].text.strip())
            print(p_elements[1].text.strip())
            with open(file_path, "w") as file:
                file.write(f"{str(page_number)}\n")
                file.write(f"{p_elements[0].text.strip()}\n")
                file.write(f"{p_elements[1].text.strip()}\n")
        else:
            break

        page_number += 1
        time.sleep(5)

check_page()