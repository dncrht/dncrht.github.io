---
layout: post
---
No es ningún descubrimiento nuevo afirmar que Flash es un devorador de recursos y que está hecho para
Windows, con un port para Linux bastante descuidado.

En un equipo con un procesador Intel i3 540 @ 3GHz con una placa Gigabyte H55M-S2 (chipset Intel H55) un vídeo de youtube en HD pone la CPU al 47%, pero no pierde fotogramas
Sin embargo, en un Phenom II 925 @ 2.8 GHz con una placa Asus M4N68T-M estamos perdiendo muchos frames.

Como la tarjeta gráfica es nVidia y soporta aceleración VDPAU, vamos a activarlo para mejorar la reproducción del vídeo.

```bash
sudo /etc/adobe/mms.cfg
```

Et voilà!

Tener una gráfica que soporte aceleración es la única manera de reproducir vídeos HD en equipos cuyo procesador no pueda.

¿Compensa comprarse un equipo con un procesador peor y suplir sus peores prestaciones en reproducción de vídeo con una gráfica mejor?

```
AMD PHENOM II X4 925 2.8GHZ SKT AM3 109.23
ASUS M4N68T-M 54
XFX GT220 1GB 54,33
```

```
INTEL CORE i3 540 3.06 GHZ SK1156 4MB 121,65
INTEL CORE i3/i5/i7 GIGABYTE H55M-S2 SK1156 DDR3 PCX M-ATX 77,97
```

Yo diría que no compensa pues:

 - Peor procesador y mejor gráfica sale un poquito más caro que un mejor procesador.
 - Para que el combo CPU/GPU funcione es necesario un software que lo soporte. No funciona con el driver libre nouveau
 - La calidad del driver nVidia para Linux es mejorable. Los cuelgues con ```NVRM: Xid``` son habituales.
 - Cualquier día Adobe retira el soporte a Flash para Linux, y vuelves a no poder reproducir vídeos HD fluidamemte.
