package com.backend.medikey.controller;

import org.springframework.web.bind.annotation.*;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.lexruntimev2.LexRuntimeV2Client;
import software.amazon.awssdk.services.lexruntimev2.model.RecognizeTextRequest;
import software.amazon.awssdk.services.lexruntimev2.model.RecognizeTextResponse;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chatbot")
@CrossOrigin(origins = "http://localhost:3000")
public class LexController {

    private static final String ACCESS_KEY = "AKIAXI7SHUFZQG5A6A7S";
    private static final String SECRET_ACCESS_KEY = "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";
    private static final String BOT_ID = "DTW0EBJSQX";
    private static final String BOT_ALIAS_ID = "M2BXAVSQQV";
    private static final String LOCALE_ID = "en_US";

    private final LexRuntimeV2Client lexClient;

    public LexController() {
        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(ACCESS_KEY, SECRET_ACCESS_KEY);
        lexClient = LexRuntimeV2Client.builder()
                .region(Region.US_EAST_1) // or your preferred region
                .credentialsProvider(StaticCredentialsProvider.create(awsCreds))
                .build();
    }

    private static RecognizeTextRequest getRecognizeTextRequest(String botId, String botAliasId, String localeId, String sessionId, String userInput) {
        RecognizeTextRequest recognizeTextRequest = RecognizeTextRequest.builder()
                .botAliasId(botAliasId)
                .botId(botId)
                .localeId(localeId)
                .sessionId(sessionId)
                .text(userInput)
                .build();
        return recognizeTextRequest;
    }

    @PostMapping("/sendMessage")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<String> sendMessage(@RequestBody String userInput) {
        String sessionId = "001";
        RecognizeTextRequest recognizeTextRequest = getRecognizeTextRequest(BOT_ID, BOT_ALIAS_ID, LOCALE_ID, sessionId, userInput);
        RecognizeTextResponse recognizeTextResponse = lexClient.recognizeText(recognizeTextRequest);

        return recognizeTextResponse.messages().stream()
                .map(message -> message.content())
                .collect(Collectors.toList());
    }


//    @PostMapping("/sendMessage")
//    public List<String> sendMessage(@RequestBody String prompt) {
//        //String sessionId = UUID.randomUUID().toString();
//        String sessionId = "001";
//        RecognizeTextRequest recognizeTextRequest = RecognizeTextRequest.builder()
//                .botAliasId(BOT_ALIAS_ID)
//                .botId(BOT_ID)
//                .localeId(LOCALE_ID)
//                .sessionId(sessionId)
//                .text(prompt)
//                .build();
//
//        RecognizeTextResponse response = lexClient.recognizeText(recognizeTextRequest);
//        return response.messages().stream()
//                .map(message -> message.content())
//                .collect(Collectors.toList());
//    }
}
