export type SpecSection = {
  title: string; 
  icon: React.FC<any>;
  rows?: [string, string][]; 
  tags?: { label: string; color: string }[]; 
  list?: string[]; 
};