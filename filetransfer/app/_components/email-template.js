import * as React from 'react';
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

/**
 * @typedef {Object} EmailTemplateProps
 * @property {string} firstName
 * @property {string} fileName
 * @property {string} fileSize
 * @property {string} fileType
 * @property {string} shortUrl
 */

/**
 * @param {EmailTemplateProps} props
 */
export const EmailTemplate = ({
  firstName,
  fileName,
  fileSize,
  fileType,
  shortUrl,
}) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Yelp recent login</Preview>
      <Container>
        <Section style={logo}>
          <Img src={'/logo.svg'} />
        </Section>

        <Section style={content}>
          <Row>
            <Img style={image} width={620} src={'/logo.svg'} />
          </Row>

          <Row style={{ ...boxInfos, paddingBottom: '0' }}>
            <Column>
              <Heading
                style={{
                  fontSize: 32,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Hi {firstName},
              </Heading>
              <Heading
                as="h2"
                style={{
                  fontSize: 26,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                We noticed a recent login to your Yelp account.
              </Heading>

              <Text style={paragraph}>
                <b>File Name: </b>
                {fileName}
              </Text>
              <Text style={{ ...paragraph, marginTop: -5 }}>
                <b>File Size: </b>
                {(fileSize/1024/1024).toFixed(2)}MB
              </Text>
              <Text style={{ ...paragraph, marginTop: -5 }}>
                <b>File Type: </b>
                {fileType}
              </Text>
              <Text style={{ ...paragraph, marginTop: -5 }}>
                <b>Download Link: </b>
                <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                  {shortUrl}
                </a>
              </Text>

              <Text style={paragraph}>
                If this was you, there's nothing else you need to do.
              </Text>
              <Text style={{ ...paragraph, marginTop: -5 }}>
                If this wasn't you or if you have additional questions, please
                see our support page.
              </Text>
            </Column>
          </Row>
          <Row style={{ ...boxInfos, paddingTop: '0' }}>
            <Column style={buttonContainer} colSpan={2}>
              <Button style={button}>Learn More</Button>
            </Column>
          </Row>
        </Section>

        <Text
          style={{
            textAlign: 'center',
            fontSize: 12,
            color: 'rgb(0,0,0, 0.7)',
          }}
        >
          © 2022 | Yelp Inc., 350 Mission Street, San Francisco, CA 94105,
          U.S.A. | www.yelp.com
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#fff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: '30px 20px',
};

const buttonContainer = {
  display: 'flex',
};

const button = {
  backgroundColor: '#e00707',
  borderRadius: 3,
  color: '#FFF',
  fontWeight: 'bold',
  border: '1px solid rgb(0,0,0, 0.1)',
  cursor: 'pointer',
  margin: '0 auto',
  padding: '12px 30px',
};

const content = {
  border: '1px solid rgb(0,0,0, 0.1)',
  borderRadius: '3px',
  overflow: 'hidden',
};

const image = {
  maxWidth: '100%',
};

const boxInfos = {
  padding: '20px',
};    
