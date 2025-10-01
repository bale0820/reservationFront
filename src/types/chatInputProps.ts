export interface ChatInputProps {
  question: string;
  setQuestion: (value: string) => void;
  handleAsk: () => void;
  loading: boolean;
}
