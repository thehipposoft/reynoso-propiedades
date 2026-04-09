# API – WordPress Estate Property

Endpoint base:
`https://propiedades.reynosobienesraices.com.ar/wp-json/wp/v2/estate_property?_embed`

## Campos descartados

| Campo WP                     | Motivo                                              |
|------------------------------|-----------------------------------------------------|
| `date` / `date_gmt`          | No se muestra en UI; se puede derivar de `modified` si se necesita |
| `modified` / `modified_gmt`  | Sin uso en UI actual                                |
| `guid`                       | URL interna de WP, no relevante para el frontend    |
| `link`                       | Se construye desde `slug` en el frontend            |
| `type`                       | Siempre `estate_property`, no aporta info           |
| `_embedded.author`           | Sin uso en UI actual                                |
| `_embedded.wp:term`          | Taxonomías de WP sin mapeo definido aún             |
| `_embedded.wp:featuredmedia[*].title` | Solo se usa `source_url`                  |

## Notas

- `per_page=100` cubre el volumen actual; ajustar si supera ese número.
- `revalidate: 3600` — ISR de 1 hora; cambiar a `0` para SSR si se necesita contenido en tiempo real.
- Campos numéricos como `property_price`, `property_size`, etc. llegan como `string` desde WP. La conversión a número debe hacerse en la capa de presentación.
