import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import {
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
 } from 'react-native';
import { theme } from '../../theme';
import { styles } from './styles';
import { FeedbackType } from '../Widget';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { captureScreen } from 'react-native-view-shot';
import { api } from '../../libs/api';
import { readAsStringAsync } from 'expo-file-system';

interface Props {
    feedbackType: FeedbackType;
    onFeedbackCanceled: () => void;
    onFeedbackSend: () => void;
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSend}: Props) {
    const [comment, setComment] = useState('');
    const [isSendingFeeback, setIsSendingFeedback] = useState(false);
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const feedbackTypeInfo = feedbackTypes[feedbackType];

    function handleScreenshot() {
        captureScreen({
            format: 'jpg',
            quality: 1.0
        }).then(uri => setScreenshot(uri)).catch(err => console.log(err));
    }

    function handleScreenshotRemove() {
        setScreenshot(null)
    }

    async function handleSendFeedback() {
        if (isSendingFeeback) {
            return;
        }

        setIsSendingFeedback(true);

        const screenshotBase64 = screenshot && await readAsStringAsync(screenshot, { encoding: 'base64' });

        try{
            await api.post('/feedbacks', {
                type: feedbackType,
                screenshot: `data:image/png;base64:${screenshot}`,
                comment
            });

            onFeedbackSend();
        }catch(err){
            console.log(err);
            setIsSendingFeedback(false);
        }
    }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.container}>
         <View style={styles.header}>
                <TouchableOpacity onPress={onFeedbackCanceled}>
                    <ArrowLeft
                        size={24}
                        weight='bold'
                        color={theme.colors.text_secondary}
                    />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Image
                    source={feedbackTypeInfo.image}
                    style={styles.image}
                    />
                    <Text style={styles.titleText}>
                        {feedbackTypeInfo.title}
                    </Text>
                </View>
            </View>

            <TextInput
            multiline
            style={styles.input}
            placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
            placeholderTextColor={theme.colors.text_secondary}
            autoCorrect={false}
            onChangeText={setComment}
            />

            <View style={styles.footer}>
                <ScreenshotButton
                    onTakeShot={handleScreenshot}
                    onRemoveShot={handleScreenshotRemove}
                    screenshot={screenshot}
                />
                <Button onPress={handleSendFeedback} isLoading={isSendingFeeback}/>
            </View>
        </View>
    </KeyboardAvoidingView>
  );
}