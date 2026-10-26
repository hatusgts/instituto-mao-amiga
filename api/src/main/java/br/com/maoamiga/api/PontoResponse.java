package br.com.maoamiga.api;

public record PontoResponse(
        Long id,
        String nome,
        String endereco,
        String diasHorarios,
        String recebeDistribui,
        Double latitude,
        Double longitude) {

    public static PontoResponse from(Ponto ponto) {
        return new PontoResponse(
                ponto.getId(),
                ponto.getNome(),
                ponto.getEndereco(),
                ponto.getDiasHorarios(),
                ponto.getRecebeDistribui(),
                ponto.getLatitude(),
                ponto.getLongitude());
    }
}
