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
#include <unistd.h>

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

    /*
    Mocking coordinates with 4 seconds between pings
    36.99750625020095, -122.05505413623403
    36.99817961427896, -122.05517006513394
    36.998743552106106, -122.05499090228862
    36.9991054801499, -122.0554967738519
    36.99994716661318, -122.0561501912878
    37.00013233638473, -122.05681414771459
    37.000006084316695, -122.05754133808679
    36.99988824886403, -122.0582052945136
    36.99987141521303, -122.05917488167654
    37.00005658516906, -122.06007069590316
    37.00014075318182, -122.06059764544824
    37.0001660035675, -122.06150399866578
    37.00003133474706, -122.06239981289241
    */

    aws_post_coordinates("Test Bus 4", "Route 5", "36.99750625020095", "-122.05505413623403");
    aws_post_coordinates("Test Bus 5", "Route 6", "37.00003133474706", "-122.06239981289241");
    sleep(4);
    aws_post_coordinates("Test Bus 5", "Route 6", "37.0001660035675", "-122.06150399866578");
    aws_post_coordinates("Test Bus 4", "Route 5", "36.99817961427896", "-122.05517006513394");
    sleep(4);
    aws_post_coordinates("Test Bus 5", "Route 6", "37.00014075318182", "-122.06059764544824");
    aws_post_coordinates("Test Bus 4", "Route 5", "36.998743552106106", "-122.05499090228862");
    sleep(4);
    aws_post_coordinates("Test Bus 5", "Route 6", "37.00005658516906", "-122.06007069590316");
    aws_post_coordinates("Test Bus 4", "Route 5", "36.9991054801499", "-122.0554967738519");
    sleep(4);
    aws_post_coordinates("Test Bus 5", "Route 6", "36.99987141521303", "-122.05917488167654");
    aws_post_coordinates("Test Bus 4", "Route 5", "36.99994716661318", "-122.0561501912878");
    sleep(4);
    aws_post_coordinates("Test Bus 5", "Route 6", "36.99988824886403", "-122.0582052945136");
    aws_post_coordinates("Test Bus 4", "Route 5", "37.00013233638473", "-122.05681414771459");
    sleep(4);
    aws_post_coordinates("Test Bus 5", "Route 6", "37.000006084316695", "-122.05754133808679");
    aws_post_coordinates("Test Bus 4", "Route 5", "37.000006084316695", "-122.05754133808679");
    sleep(4);
    aws_post_coordinates("Test Bus 5", "Route 6", "37.00013233638473", "-122.05681414771459");
    aws_post_coordinates("Test Bus 4", "Route 5", "36.99988824886403", "-122.0582052945136");
    sleep(4);
    aws_post_coordinates("Test Bus 5", "Route 6", "36.99994716661318", "-122.0561501912878");
    aws_post_coordinates("Test Bus 4", "Route 5", "36.99987141521303", "-122.05917488167654");
    sleep(4);
    aws_post_coordinates("Test Bus 5", "Route 6", "36.9991054801499", "-122.0554967738519");
    aws_post_coordinates("Test Bus 4", "Route 5", "37.00005658516906", "-122.06007069590316");
    sleep(4);
    aws_post_coordinates("Test Bus 5", "Route 6", "36.998743552106106", "-122.05499090228862");
    aws_post_coordinates("Test Bus 4", "Route 5", "37.00014075318182", "-122.06059764544824");
    sleep(4);
    aws_post_coordinates("Test Bus 5", "Route 6", "36.99817961427896", "-122.05517006513394");
    aws_post_coordinates("Test Bus 4", "Route 5", "37.0001660035675", "-122.06150399866578");
    sleep(4);
    aws_post_coordinates("Test Bus 5", "Route 6", "36.99750625020095", "-122.05505413623403");
    aws_post_coordinates("Test Bus 4", "Route 5", "37.00003133474706", "-122.06239981289241");
    sleep(4);

    return 0;
}