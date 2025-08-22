"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/skills";
import { Skill } from "@/types";
import React from "react";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiVuedotjs,
  SiNodedotjs,
  SiGit,
  SiDocker,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiFigma,
  SiPython,
  SiOpenjdk,
  SiPhp,
  SiCplusplus,
  SiProxmox,
} from "react-icons/si";
import { DiScrum } from "react-icons/di";
import { MdViewKanban } from "react-icons/md";
import { TbBrandCSharp } from "react-icons/tb";

const About = () => {
  // Mapping des compétences vers leurs vraies icônes
  const getSkillIcon = (skillName: string) => {
    const iconMap: { [key: string]: React.ReactElement } = {
      JavaScript: <SiJavascript className="text-yellow-400" />,
      TypeScript: <SiTypescript className="text-blue-400" />,
      React: <SiReact className="text-cyan-400" />,
      "Vue.js": <SiVuedotjs className="text-green-400" />,
      "Node.js": <SiNodedotjs className="text-green-500" />,
      Git: <SiGit className="text-orange-500" />,
      Docker: <SiDocker className="text-blue-500" />,
      MySQL: <SiMysql className="text-blue-600" />,
      PostgreSQL: <SiPostgresql className="text-blue-700" />,
      MongoDB: <SiMongodb className="text-green-600" />,
      Figma: <SiFigma className="text-purple-500" />,
      Python: <SiPython className="text-blue-400" />,
      Java: <SiOpenjdk className="text-red-500" />,
      PHP: <SiPhp className="text-purple-600" />,
      "C++": <SiCplusplus className="text-blue-600" />,
      "C#": <TbBrandCSharp className="text-blue-600" />,
      Proxmox: <SiProxmox className="text-blue-600" />,
      "Agile/Scrum": <DiScrum className="text-blue-400" />,
      Kanban: <MdViewKanban className="text-orange-400" />,
    };
    return (
      iconMap[skillName] || (
        <span className="text-2xl">
          {skills.find((s) => s.name === skillName)?.icon}
        </span>
      )
    );
  };

  // Fonction pour obtenir la taille selon le niveau de maîtrise
  const getSizeFromLevel = (level: Skill["level"]) => {
    switch (level) {
      case "expert":
        return "w-20 h-20"; // 80px
      case "advanced":
        return "w-[70px] h-[70px]"; // 70px
      case "intermediate":
        return "w-15 h-15"; // 60px
      case "beginner":
        return "w-12 h-12"; // 48px
      default:
        return "w-15 h-15";
    }
  };

  // Positions aléatoires avec espacement minimal garanti (distance > 12% entre chaque bulle)
  const cloudPositions = [
    { top: "8%", left: "15%" },
    { top: "12%", left: "45%" },
    { top: "16%", left: "75%" },
    { top: "28%", left: "25%" },
    { top: "32%", left: "60%" },
    { top: "36%", left: "88%" },
    { top: "48%", left: "12%" },
    { top: "52%", left: "42%" },
    { top: "56%", left: "72%" },
    { top: "68%", left: "18%" },
    { top: "72%", left: "52%" },
    { top: "76%", left: "82%" },
    { top: "88%", left: "28%" },
    { top: "92%", left: "65%" },
    { top: "24%", left: "8%" },
    { top: "44%", left: "90%" },
    { top: "64%", left: "35%" },
    { top: "84%", left: "48%" },
  ];

  // Filtrer les compétences principales (expert, advanced et quelques intermediate stratégiques)
  const mainSkills = skills
    .filter(
      (skill) =>
        skill.level === "expert" ||
        skill.level === "advanced" ||
        (skill.level === "intermediate" &&
          ["Vue.js", "Node.js", "Docker", "MySQL", "Python", "PHP"].includes(
            skill.name
          ))
    )
    .slice(0, 12); // Augmenter à 12 pour remplir le nuage
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            À propos de <span className="gradient-text">moi</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Découvrez mon parcours, mes compétences et ma passion pour
            l&apos;informatique
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Mon parcours</h3>
            <p className="text-white/80 leading-relaxed">
              Étudiant en 2ème année de BUT Informatique à L&apos;IUT
              d&apos;Orléans, je me spécialise dans le développement
              d&apos;applications. Ma passion pour les technologies web et
              l&apos;intelligence artificielle m&apos;a conduit à explorer
              diverses technologies et frameworks modernes.
            </p>
            <p className="text-white/80 leading-relaxed">
              J&apos;ai acquis une expérience pratique grâce à des stages en
              entreprise et des projets personnels, me permettant de développer
              une approche complète du développement full-stack.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-white mb-8 text-center">
              Compétences principales
            </h3>
            <div className="relative h-96 md:h-80 px-8 py-4">
              {mainSkills.map((skill, index) => {
                const sizeClasses = getSizeFromLevel(skill.level);
                const position = cloudPositions[index % cloudPositions.length];
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    whileHover={{
                      scale: 1.2,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.3 },
                    }}
                    animate={{
                      y: [0, -15, 0],
                      x: [0, Math.sin(index) * 5, 0],
                      rotate: [0, 2, -2, 0],
                    }}
                    transition={{
                      // Animation d'entrée
                      opacity: { duration: 0.8, delay: index * 0.15 },
                      scale: {
                        duration: 0.8,
                        delay: index * 0.15,
                        type: "spring",
                        bounce: 0.4,
                      },
                      rotate: { duration: 0.8, delay: index * 0.15 },
                      // Animation de flottement
                      y: {
                        duration: 4 + (index % 4) * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3,
                      },
                      x: {
                        duration: 6 + (index % 3) * 0.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2,
                      },
                    }}
                    style={{
                      position: "absolute",
                      top: position.top,
                      left: position.left,
                      transform: "translate(-50%, -50%)",
                    }}
                    className="group cursor-pointer z-10 hover:z-50"
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <div
                        className={`${sizeClasses} glass-card rounded-full flex items-center justify-center border border-white/20 group-hover:border-purple-400/60 group-hover:shadow-lg group-hover:shadow-purple-400/25 transition-all duration-300 backdrop-blur-sm bg-white/5`}
                      >
                        <div className="text-2xl md:text-3xl transform group-hover:scale-110 transition-transform duration-300">
                          {getSkillIcon(skill.name)}
                        </div>
                      </div>
                      <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-full mt-2 whitespace-nowrap">
                        <span className="text-white/90 text-xs font-medium bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                          {skill.name}
                        </span>
                        <div className="text-xs text-purple-400 capitalize font-medium">
                          {skill.level}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              {/* Particules flottantes d'arrière-plan placées aléatoirement */}
              {[
                { top: "15%", left: "12%" },
                { top: "35%", left: "88%" },
                { top: "62%", left: "8%" },
                { top: "28%", left: "65%" },
                { top: "78%", left: "23%" },
                { top: "45%", left: "92%" },
                { top: "85%", left: "47%" },
                { top: "18%", left: "34%" },
                { top: "56%", left: "71%" },
                { top: "92%", left: "15%" },
                { top: "8%", left: "78%" },
                { top: "72%", left: "56%" },
              ].map((pos, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
                  animate={{
                    y: [0, -25 + Math.random() * 10, 0],
                    x: [0, (Math.random() - 0.5) * 15, 0],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                  style={{
                    top: pos.top,
                    left: pos.left,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
