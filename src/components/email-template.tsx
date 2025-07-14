import * as React from 'react';

interface EmailTemplateProps {
  Email: string,
  Message: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  Email,
  Message,
}) => (
  <div>
      <b>Hello, Sam you have an email from {Email}</b>
      <br />
      <p>{Message}</p>
  </div>
);