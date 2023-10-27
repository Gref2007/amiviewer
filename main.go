package main

import (
	"amiViewer/events"
	"bufio"
	"encoding/json"
	"fmt"
	"log"
	"os"
)

func main() {

	file, err := os.Open("example.astl")

	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()

	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		fmt.Println(scanner.Text())
		var t = scanner.Text()

		fmt.Println(t)
		var event events.ManagerEvent

		err = json.Unmarshal([]byte(scanner.Text()), &event)

		if err != nil {
			log.Fatal(err)
		}

	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

}
