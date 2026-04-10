import Image from "next/image";
import Link from "next/link";

export const Footer = () => (
  <footer className="bg-[#3A3937]">
    <div className="mx-auto flex max-w-[80vw] flex-col lg:max-w-[1250px]">

      {/* Cuerpo */}
      <div className="flex flex-col border-b border-primary-green py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start lg:gap-0">

          {/* Logo + contacto */}
          <div className="flex flex-col items-center gap-10 md:items-start">
            <Image
              src="/assets/images/logo-white.png"
              alt="Logo Reynoso"
              width={260}
              height={140}
              className="w-auto max-w-[280px] object-contain"
            />
            <div className="flex flex-col gap-2 md:w-72">
              {/* Dirección */}
              <div className="flex items-center gap-2">
                <svg className="min-w-6 max-w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 20h2m0 0h5m-5 0V7.2002c0-1.12011 0-1.68058.21799-2.1084.19174-.37633.49748-.68207.87381-.87381C5.51962 4 6.08009 4 7.2002 4h1.6c1.1201 0 1.6794 0 2.1072.21799.3763.19174.6831.49748.8748.87381C12 5.5192 12 6.07899 12 7.19691v2.80329M9 20h11M9 20v-5.6318c0-.5254 0-.7882.063-1.0332.05583-.2172.14773-.4232.27196-.6098.14009-.2105.33617-.3868.72654-.7375l2.3016-2.06773c.7547-.67805 1.1324-1.01733 1.5594-1.14604.3764-.11348.7782-.11348 1.1546 0 .4274.12882.8056.46827 1.5616 1.14746l2.3 2.06631c.3908.3511.5858.5269.726.7375.1242.1866.216.3926.2718.6098.063.245.0635.5078.0635 1.0332V20m0 0h2" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <Link href="https://maps.app.goo.gl/uEYeRbV7cRkBSJfK9" target="_blank" rel="noreferrer" className="text-sm text-white hover:underline">
                  J. M. Leguizamón 515, OF. 201, Piso 2 (CP 4400) Salta, Argentina
                </Link>
              </div>
              {/* Teléfono */}
              <div className="flex items-center gap-2">
                <svg className="w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5.5C3 14.0604 9.93959 21 18.5 21c.3862 0 .7691-.0141 1.1483-.0419.4351-.0319.6526-.0478.8507-.1618.164-.0944.3195-.2618.4017-.4323.0993-.2058.0993-.4459.0993-.926v-2.8173c0-.4038 0-.6057-.0665-.7787-.0586-.1529-.154-.289-.2776-.3964-.1399-.1216-.3297-.1906-.7091-.3286L16.74 13.9509c-.4415-.1605-.6623-.2408-.8717-.2272-.1847.012-.3624.0751-.5134.1821-.1712.1213-.292.3227-.5337.7256L14 16c-2.6499-1.2001-4.7981-3.3511-6-6l1.36863-.82118c.40282-.24169.60423-.36254.72557-.53376.107-.15098.1701-.32869.1821-.51336.0136-.20943-.0667-.43017-.2272-.87165L8.88299 4.05321c-.13799-.37945-.20698-.56918-.32857-.70911-.10741-.12361-.24353-.21895-.3964-.27765C7.98496 3 7.78308 3 7.37932 3H4.56201c-.48013 0-.7202 0-.92603.09925-.17048.08221-.33784.23776-.43228.40178-.11402.19804-.12995.41559-.16181.8507C3.01413 4.73086 3 5.11378 3 5.5Z" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <Link href="tel:3874063402" className="w-2/3 text-sm text-white hover:underline">
                  +54 387 4063 402
                </Link>
              </div>
              {/* Email */}
              <div className="flex items-center gap-2">
                <svg className="w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="m4 18 5-6m11 6-5-6M3 8l7.225 4.8166c.6415.4277.9622.6416 1.3089.7246.3064.0735.6258.0735.9322 0 .3467-.083.6674-.2969 1.3089-.7246L21 8M6.2 19h11.6c1.1201 0 1.6802 0 2.108-.218.3763-.1917.6823-.4977.874-.874.218-.4278.218-.9879.218-2.108V8.2c0-1.1201 0-1.68016-.218-2.10798-.1917-.37633-.4977-.68229-.874-.87403C19.4802 5 18.9201 5 17.8 5H6.2c-1.1201 0-1.68016 0-2.10798.21799-.37633.19174-.68229.4977-.87403.87403C3 6.51984 3 7.07989 3 8.2v7.6c0 1.1201 0 1.6802.21799 2.108.19174.3763.4977.6823.87403.874C4.51984 19 5.07989 19 6.2 19Z" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <Link href="mailto:info@reynosobienesraices.com.ar" className="w-2/3 text-sm text-white hover:underline">
                  info@reynosobienesraices.com.ar
                </Link>
              </div>
            </div>
          </div>
            <div className="flex gap-16">
              <Link href="/#nosotros" className="h-fit font-jakarta text-lg font-bold text-white hover:underline">Nosotros</Link>
              <Link href="https://reynosobienesraices.com.ar/desarrollos" target="_blank" rel="noreferrer" className="h-fit font-jakarta text-lg font-bold text-white hover:underline">Nuestros Desarrollos</Link>
            </div>
          {/* Nav + RRSS */}
          <div className="flex flex-wrap justify-between ">

              <div className="flex flex-col">
                <h4 className="font-jakarta text-lg font-bold text-white">Seguinos!</h4>
                <div className="flex gap-4 pt-4 lg:gap-2">
                  {/* Instagram */}
                  <Link href="https://www.instagram.com/reynosobienesraicessalta" rel="noreferrer" target="_blank" className="group flex h-12 w-12 items-center justify-center rounded-full bg-white duration-500 hover:scale-110 hover:bg-white/10">
                    <svg className="scale-[175%]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
                      <path className="duration-300 group-hover:fill-white" fill="#090B19" d="M5.12.96A4.163 4.163 0 0 0 .96 5.12v5.76a4.163 4.163 0 0 0 4.16 4.16h5.76a4.163 4.163 0 0 0 4.16-4.16V5.12A4.163 4.163 0 0 0 10.88.96H5.12Zm6.72 2.56a.641.641 0 0 1 0 1.28.641.641 0 0 1 0-1.28ZM8 4.48A3.522 3.522 0 0 1 11.52 8 3.522 3.522 0 0 1 8 11.52 3.522 3.522 0 0 1 4.48 8 3.522 3.522 0 0 1 8 4.48Zm0 .64A2.884 2.884 0 0 0 5.12 8 2.884 2.884 0 0 0 8 10.88 2.884 2.884 0 0 0 10.88 8 2.884 2.884 0 0 0 8 5.12Z"/>
                    </svg>
                  </Link>

                  {/* Facebook */}
                  <Link href="https://www.facebook.com/reynosobienesraices/" rel="noreferrer" target="_blank" className="group flex h-12 w-12 items-center justify-center rounded-full bg-white duration-500 hover:scale-110 hover:bg-white/10">
                    <svg className="scale-[175%]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
                      <path className="duration-300 group-hover:fill-white" fill="#090B19" d="M10.24 3.52h1.6a.32.32 0 0 0 .32-.32V1.044a.32.32 0 0 0-.296-.319A37.075 37.075 0 0 0 9.645.64C7.68.64 6.4 1.818 6.4 3.958V6.08H4.16a.32.32 0 0 0-.32.32v2.24c0 .176.144.32.32.32H6.4v6.08c0 .176.144.32.32.32h2.24a.32.32 0 0 0 .32-.32V8.96h2.311a.32.32 0 0 0 .318-.285l.249-2.24a.32.32 0 0 0-.318-.355H9.28v-1.6c0-.53.43-.96.96-.96Z"/>
                    </svg>
                  </Link>

                  {/* LinkedIn */}
                  <Link href="https://www.linkedin.com/company/reynoso-bienes-raices/" rel="noreferrer" target="_blank" className="group flex h-12 w-12 items-center justify-center rounded-full bg-white duration-500 hover:scale-110 hover:bg-white/10">
                    <svg className="scale-[175%]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
                      <path className="duration-300 group-hover:fill-white" fill="#090B19" d="M2.56.962C1.45.962.642 1.63.642 2.544c0 .918.827 1.612 1.918 1.612 1.11 0 1.916-.677 1.916-1.631C4.426 1.606 3.635.962 2.56.962ZM.96 4.8a.32.32 0 0 0-.32.32v9.28c0 .176.144.32.32.32h3.2a.32.32 0 0 0 .32-.32V5.12a.32.32 0 0 0-.32-.32H.96Zm4.8 0a.32.32 0 0 0-.32.32v9.28c0 .176.144.32.32.32h2.88a.32.32 0 0 0 .32-.32V9.44c0-.759.582-1.376 1.325-1.434C10.324 8 10.36 8 10.4 8a1.435 1.435 0 0 1 1.44 1.44v4.96c0 .176.144.32.32.32h2.88a.32.32 0 0 0 .32-.32V8.96c0-2.07-1.111-4.16-3.588-4.16a4.329 4.329 0 0 0-2.492.796V5.12a.32.32 0 0 0-.32-.32h-3.2Z"/>
                    </svg>
                  </Link>

                  {/* YouTube */}
                  <Link href="https://www.youtube.com/@reynosobienesraices4815" rel="noreferrer" target="_blank" className="group flex h-12 w-12 items-center justify-center rounded-full bg-white duration-500 hover:scale-110 hover:bg-white/10">
                    <svg className="scale-[175%]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
                      <path className="duration-300 group-hover:fill-white" fill="#090B19" d="M14.367 4.64c-.127-.704-.735-1.216-1.44-1.376-1.054-.224-3.007-.384-5.12-.384-2.11 0-4.095.16-5.15.384-.705.16-1.313.64-1.44 1.376C1.086 5.44.96 6.56.96 8s.127 2.56.287 3.36c.13.704.737 1.216 1.44 1.376 1.12.224 3.04.384 5.153.384 2.112 0 4.033-.16 5.152-.384.704-.16 1.312-.64 1.44-1.376.128-.8.288-1.953.32-3.36a22.392 22.392 0 0 0-.385-3.36Zm-8.287 5.6V5.76L9.984 8 6.08 10.24Z"/>
                    </svg>
                  </Link>

                </div>
              </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="flex items-center justify-center pb-4 pt-8">
        <Link href="https://www.thehipposoft.com/" rel="noreferrer" target="_blank" className="text-center font-jakarta text-white hover:underline">
          Created by <strong>HippoSoft</strong> | All Rights Reserved
        </Link>
      </div>

    </div>
  </footer>
);
