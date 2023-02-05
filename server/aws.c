//  Purpose:    Post data to an Express Server
//
//  On basestation, execute
//  sudo apt-get install libcurl4-openssl-dev
//
//  Test with
//  curl -XGET  https://slugloop.azurewebsites.net/

#include <endian.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <curl/curl.h>

#define POST_URL "https://slugloop.azurewebsites.net/ping"

// void error_and_close(const char *err_msg)
// {

// }

void aws_post_coordinates(
    const char *bus_id,
    const char *route_name,
    const char *latitude,
    const char *longitude)
{

    char buffer[1000];
    CURL *h;
    CURLcode curl_code;

    // Init winstock
    curl_global_init(CURL_GLOBAL_ALL);

    if ((h = curl_easy_init()) == NULL) // Creates a handle
    {
        fprintf(stderr, "curl_easy_init() returns NULL\n");
        exit(1);
        // printf("curl_easy_init() returns NULL\n");
        // strlog_and_exit("curl_easy_init() returns NULL\n");
    }

    // Prevent buffer overflow.
    if (strlen(bus_id) > 100 ||
        strlen(route_name) > 255 ||
        strlen(latitude) > 100 ||
        strlen(longitude) > 100)
    {
        printf("Parameter Too Long\n");
        curl_easy_cleanup(h);
        return;
        // strlog_and_exit("parameter too long");
    }

    sprintf(buffer,
            "data=[{\"id\":\"%s\",\"lat\":%s,\"lon\":%s,\"route\":\"%s\"}]",
            bus_id, latitude, longitude, route_name);

    // curl_easy_setopt(h, CURLOPT_URL,            AWS_POST_URL);
    curl_easy_setopt(h, CURLOPT_URL, POST_URL);
    curl_easy_setopt(h, CURLOPT_COPYPOSTFIELDS, buffer);

    if ((curl_code = curl_easy_perform(h)) != 0)
    {
        fprintf(stderr, "curl_easy_perform() failed: %s\n", curl_easy_strerror(curl_code));
        // printf("curl_easy_perform() returns %d", (int) curl_code);
        // strlog("curl_easy_perform() returns %d", (int) curl_code);
    }

    curl_easy_cleanup(h);
    return;
}

int main(int argc, char *argv[])
{
    // Cowell
    // aws_post_coordinates("Test Bus 1", "Route 1", "36.99749089119584", "-122.05506229535541");
    // College 9
    //  aws_post_coordinates("Test Bus 2", "Route 2", "36.99992904135921", "-122.05831007378065");
    // Carson
    aws_post_coordinates("Test Bus 4", "Route 5", "36.99060884891997", "-122.0661073461559");
    return 0;
}