using backend.DataAccess;
using Microsoft.Extensions.Configuration;

namespace backend.Database;

public static class DbInitializer
{
    public static void Initialize(SimTuneDbContext context, IConfiguration configuration)
    {
        // Alle Übungen definieren
        var allExercises = new List<Exercise>
        {
            // Stammtöne Klavier (IDs 1-10)
            new Exercise { Key = "stammtoene_klavier_cde_lesen", Description = "Lies c, d und e", NotationType = NotationType.Klavier, ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "stammtoene_klavier_cde_schreiben", Description = "Markiere c, d und e", NotationType = NotationType.Klavier, ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = ExerciseModus.Schreiben },
            new Exercise { Key = "stammtoene_klavier_efg_lesen", Description = "Lies e, f und g", NotationType = NotationType.Klavier, ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "stammtoene_klavier_efg_schreiben", Description = "Markiere e, f und g", NotationType = NotationType.Klavier, ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = ExerciseModus.Schreiben },
            new Exercise { Key = "stammtoene_klavier_c_bis_g_lesen", Description = "Lies c bis g", NotationType = NotationType.Klavier, ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "stammtoene_klavier_c_bis_g_schreiben", Description = "Markiere c bis g", NotationType = NotationType.Klavier, ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = ExerciseModus.Schreiben },
            new Exercise { Key = "stammtoene_klavier_gahc_lesen", Description = "Lies g, a, h und c", NotationType = NotationType.Klavier, ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "stammtoene_klavier_gahc_schreiben", Description = "Markiere g, a, h und c", NotationType = NotationType.Klavier, ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = ExerciseModus.Schreiben },
            new Exercise { Key = "stammtoene_klavier_alle_lesen", Description = "Lies alle Stammtöne", NotationType = NotationType.Klavier, ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "stammtoene_klavier_alle_schreiben", Description = "Markiere alle Stammtöne", NotationType = NotationType.Klavier, ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = ExerciseModus.Schreiben },

            // Stammtöne Violinschlüssel (IDs 11-20)
            new Exercise { Key = "stammtoene_violin_cde_lesen", Description = "Lies c, d und e", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "stammtoene_violin_cde_schreiben", Description = "Schreibe c, d und e", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = ExerciseModus.Schreiben },
            new Exercise { Key = "stammtoene_violin_efg_lesen", Description = "Lies e, f und g", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "stammtoene_violin_efg_schreiben", Description = "Schreibe e, f und g", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = ExerciseModus.Schreiben },
            new Exercise { Key = "stammtoene_violin_c_bis_g_lesen", Description = "Lies c bis g", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "stammtoene_violin_c_bis_g_schreiben", Description = "Schreibe c bis g", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = ExerciseModus.Schreiben },
            new Exercise { Key = "stammtoene_violin_gahc_lesen", Description = "Lies g, a, h und c", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "stammtoene_violin_gahc_schreiben", Description = "Schreibe g, a, h und c", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = ExerciseModus.Schreiben },
            new Exercise { Key = "stammtoene_violin_alle_lesen", Description = "Lies alle Stammtöne", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "stammtoene_violin_alle_schreiben", Description = "Schreibe alle Stammtöne", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = ExerciseModus.Schreiben },

            // Intervalle Basis (IDs 21-26)
            new Exercise { Key = "intervalle_basis_prime_bis_quinte_lesen", Description = "Lies Prime bis Quinte", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.IntervalleBasis, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "intervalle_basis_prime_bis_quinte_schreiben", Description = "Schreibe Prime bis Quinte", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.IntervalleBasis, ExerciseModus = ExerciseModus.Schreiben },
            new Exercise { Key = "intervalle_basis_sexte_bis_oktave_lesen", Description = "Lies Sexte bis Oktave", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.IntervalleBasis, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "intervalle_basis_sexte_bis_oktave_schreiben", Description = "Schreibe Sexte bis Oktave", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.IntervalleBasis, ExerciseModus = ExerciseModus.Schreiben },
            new Exercise { Key = "intervalle_basis_alle_lesen", Description = "Lies alle Intervalle", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.IntervalleBasis, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "intervalle_basis_alle_schreiben", Description = "Schreibe alle Intervalle", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.IntervalleBasis, ExerciseModus = ExerciseModus.Schreiben },

            // Versetzungszeichen Violin (IDs 30-34)
            new Exercise { Key = "versetzungszeichen_violin_kreuz_cis_dis_fis", Description = "Lies Kreuz-Noten (cis, dis, fis)", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.VersetzungszeichenViolinschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "versetzungszeichen_violin_b_des_es_ges", Description = "Lies B-Noten (des, es, ges)", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.VersetzungszeichenViolinschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "versetzungszeichen_violin_alle_kreuz", Description = "Lies alle Kreuznoten", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.VersetzungszeichenViolinschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "versetzungszeichen_violin_alle_b", Description = "Lies alle B-Noten", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.VersetzungszeichenViolinschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "versetzungszeichen_violin_alle_mit_oktaven", Description = "Lies alle Versetzungszeichen mit Oktaven", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.VersetzungszeichenViolinschluessel, ExerciseModus = ExerciseModus.Lesen },

            // Hilfslinien Violin (IDs 35-39)
            new Exercise { Key = "hilfslinien_violin_kleine_oktave", Description = "Bezeichne die kleine Oktave", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.HilfslinienViolinschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "hilfslinien_violin_eingestrichene_oktave", Description = "Bezeichne die eingestrichene Oktave", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.HilfslinienViolinschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "hilfslinien_violin_zweigestrichene_oktave", Description = "Bezeichne die zweigestrichene Oktave", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.HilfslinienViolinschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "hilfslinien_violin_dreigestrichene_oktave", Description = "Bezeichne die dreigestrichene Oktave", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.HilfslinienViolinschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "hilfslinien_violin_alle_oktaven", Description = "Bezeichne Noten in allen Oktaven", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.HilfslinienViolinschluessel, ExerciseModus = ExerciseModus.Lesen },

            // Stammtöne Bass (IDs 40-49)
            new Exercise { Key = "stammtoene_bass_cde_lesen", Description = "Lies c, d und e", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneBassschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "stammtoene_bass_cde_schreiben", Description = "Schreibe c, d und e", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneBassschluessel, ExerciseModus = ExerciseModus.Schreiben },
            new Exercise { Key = "stammtoene_bass_efg_lesen", Description = "Lies e, f und g", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneBassschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "stammtoene_bass_efg_schreiben", Description = "Schreibe e, f und g", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneBassschluessel, ExerciseModus = ExerciseModus.Schreiben },
            new Exercise { Key = "stammtoene_bass_c_bis_g_lesen", Description = "Lies c bis g", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneBassschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "stammtoene_bass_c_bis_g_schreiben", Description = "Schreibe c bis g", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneBassschluessel, ExerciseModus = ExerciseModus.Schreiben },
            new Exercise { Key = "stammtoene_bass_gahc_lesen", Description = "Lies g, a, h und c", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneBassschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "stammtoene_bass_gahc_schreiben", Description = "Schreibe g, a, h und c", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneBassschluessel, ExerciseModus = ExerciseModus.Schreiben },
            new Exercise { Key = "stammtoene_bass_alle_lesen", Description = "Lies alle Stammtöne", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneBassschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "stammtoene_bass_alle_schreiben", Description = "Schreibe alle Stammtöne", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneBassschluessel, ExerciseModus = ExerciseModus.Schreiben },

            // Versetzungszeichen Bass (IDs 50-54)
            new Exercise { Key = "versetzungszeichen_bass_kreuz_cis_dis_fis", Description = "Lies Kreuz-Noten (cis, dis, fis)", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.VersetzungszeichenBassschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "versetzungszeichen_bass_b_des_es_ges", Description = "Lies B-Noten (des, es, ges)", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.VersetzungszeichenBassschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "versetzungszeichen_bass_alle_kreuz", Description = "Lies alle Kreuznoten", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.VersetzungszeichenBassschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "versetzungszeichen_bass_alle_b", Description = "Lies alle B-Noten", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.VersetzungszeichenBassschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "versetzungszeichen_bass_alle_mit_oktaven", Description = "Lies alle Versetzungszeichen mit Oktaven", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.VersetzungszeichenBassschluessel, ExerciseModus = ExerciseModus.Lesen },

            // Hilfslinien Bass (IDs 55-59)
            new Exercise { Key = "hilfslinien_bass_kleine_oktave", Description = "Bezeichne die kleine Oktave", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.HilfslinienBassschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "hilfslinien_bass_eingestrichene_oktave", Description = "Bezeichne die eingestrichene Oktave", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.HilfslinienBassschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "hilfslinien_bass_zweigestrichene_oktave", Description = "Bezeichne die zweigestrichene Oktave", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.HilfslinienBassschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "hilfslinien_bass_dreigestrichene_oktave", Description = "Bezeichne die dreigestrichene Oktave", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.HilfslinienBassschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "hilfslinien_bass_alle_oktaven", Description = "Bezeichne Noten in allen Oktaven", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.HilfslinienBassschluessel, ExerciseModus = ExerciseModus.Lesen },

            // Intervalle (IDs 60-64)
            new Exercise { Key = "intervalle_rein_lesen", Description = "Lies reine Intervalle (Prime, 4, 5, 8)", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.IntervalleRein, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "intervalle_gross_klein_sekunde_terz", Description = "Lies Sekunden und Terzen (groß/klein)", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.IntervalleGrossKlein, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "intervalle_gross_klein_sexte_septime", Description = "Lies Sexten und Septimen (groß/klein)", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.IntervalleGrossKlein, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "intervalle_gross_klein_alle", Description = "Lies alle großen/kleinen Intervalle", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.IntervalleGrossKlein, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "intervalle_vermindert_uebermaessig", Description = "Lies übermäßige/verminderte Intervalle", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.IntervalleVermindertUebermaessig, ExerciseModus = ExerciseModus.Lesen },

            // --- NEUE TONLEITER ÜBUNGEN (LESEN) ---

            // 1. Dur Tonleitern (IDs 100-109)
            new Exercise { Key = "tonleitern_dur_lesen", Description = "Bestimme die Dur-Tonleiter", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.TonleiternDur, ExerciseModus = ExerciseModus.Lesen },

            // 2. Moll Tonleitern (IDs 110-129)
            new Exercise { Key = "tonleitern_moll_natuerlich_lesen", Description = "Bestimme die natürliche Moll-Tonleiter", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.TonleiternMollNatuerlich, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "tonleitern_moll_harmonisch_lesen", Description = "Bestimme die harmonische Moll-Tonleiter", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.TonleiternMollHarmonisch, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "tonleitern_moll_melodisch_lesen", Description = "Bestimme die melodische Moll-Tonleiter", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.TonleiternMollMelodisch, ExerciseModus = ExerciseModus.Lesen },

            // 3. Vorzeichen / Quintenzirkel (IDs 130-139)
            new Exercise { Key = "tonleitern_vorzeichen_dur_lesen", Description = "Welche Dur-Tonart hat diese Vorzeichen?", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.TonleiternVorzeichen, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Key = "tonleitern_vorzeichen_moll_lesen", Description = "Welche Moll-Tonart hat diese Vorzeichen?", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.TonleiternVorzeichen, ExerciseModus = ExerciseModus.Lesen },

            // 4. Mix / Unterscheidung (IDs 140-149)
            new Exercise { Key = "tonleitern_mix_dur_moll_lesen", Description = "Ist das Dur, Moll (nat.), (harm.) oder (mel.)?", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.TonleiternMix, ExerciseModus = ExerciseModus.Lesen },
        };

        // Bestehende Übungen aus DB laden
        var existingExercises = context.Exercises.ToList();

        // Übungen hinzufügen oder aktualisieren
        foreach (var exercise in allExercises)
        {
            var existingExercise = existingExercises.FirstOrDefault(e => e.Key == exercise.Key);

            if (existingExercise != null)
            {
                // Prüfe ob sich Eigenschaften geändert haben
                bool hasChanged = false;
                
                if (existingExercise.ExerciseType != exercise.ExerciseType)
                {
                    existingExercise.ExerciseType = exercise.ExerciseType;
                    hasChanged = true;
                }
                
                if (existingExercise.Description != exercise.Description)
                {
                    existingExercise.Description = exercise.Description;
                    hasChanged = true;
                }
                
                if (existingExercise.NotationType != exercise.NotationType)
                {
                    existingExercise.NotationType = exercise.NotationType;
                    hasChanged = true;
                }
                
                if (existingExercise.ExerciseModus != exercise.ExerciseModus)
                {
                    existingExercise.ExerciseModus = exercise.ExerciseModus;
                    hasChanged = true;
                }
                
                if (hasChanged)
                {
                    Console.WriteLine($"Übung aktualisiert: {exercise.Key} - {exercise.Description}");
                }
            }
            else
            {
                context.Exercises.Add(exercise);
                Console.WriteLine($"Neue Übung hinzugefügt: {exercise.Key} - {exercise.Description}");
            }
        }

        context.SaveChanges();

        // ExerciseContents laden
        var path = configuration["ExerciseContentsPath"];
        Console.WriteLine("ExerciseContentsPath: " + path);
        ImportCsv.ImportExerciseContents(path, context);
    }
}