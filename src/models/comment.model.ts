export interface comment {
    id : number;
    mediaId : number;
    content : string;
    author : string;
    createdAT : string; 
    replies? : comment[] // struture recursive pour les réponses aux commentaires
}